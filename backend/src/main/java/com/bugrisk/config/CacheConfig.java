package com.bugrisk.config;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.databind.jsontype.PolymorphicTypeValidator;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;

import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class CacheConfig {

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        ObjectMapper objectMapper = new ObjectMapper();
        
        // Register JavaTimeModule to handle LocalDateTime
        objectMapper.registerModule(new JavaTimeModule());
        
        // Register custom deserializer for PageImpl
        SimpleModule module = new SimpleModule();
        module.addDeserializer(PageImpl.class, new PageImplDeserializer());
        objectMapper.registerModule(module);
        
        // Enable default typing so types are stored in JSON (compatible with GenericJackson2JsonRedisSerializer)
        PolymorphicTypeValidator ptv = BasicPolymorphicTypeValidator.builder()
                .allowIfBaseType(Object.class)
                .build();
        objectMapper.activateDefaultTyping(ptv, ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);

        GenericJackson2JsonRedisSerializer serializer = new GenericJackson2JsonRedisSerializer(objectMapper);

        return RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(60))
                .disableCachingNullValues()
                .serializeValuesWith(SerializationPair.fromSerializer(serializer));
    }

    public static class PageImplDeserializer extends JsonDeserializer<PageImpl<?>> {
        @Override
        public PageImpl<?> deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {
            ObjectMapper mapper = (ObjectMapper) jp.getCodec();
            JsonNode node = mapper.readTree(jp);
            
            // Deserialize content list
            List<Object> content = new ArrayList<>();
            JsonNode contentNode = node.get("content");
            if (contentNode != null) {
                // If it is a polymorphic wrapper: ["java.util.ArrayList", [...]]
                if (contentNode.isArray() && contentNode.size() == 2 && contentNode.get(0).isTextual() && contentNode.get(1).isArray()) {
                    contentNode = contentNode.get(1);
                }
                if (contentNode.isArray()) {
                    for (JsonNode elem : contentNode) {
                        content.add(mapper.treeToValue(elem, Object.class));
                    }
                }
            }
            
            long totalElements = 0;
            if (node.has("totalElements")) {
                totalElements = node.get("totalElements").asLong();
            } else if (node.has("total")) {
                totalElements = node.get("total").asLong();
            } else {
                totalElements = content.size();
            }
            
            int pageNumber = 0;
            int pageSize = 10;
            JsonNode pageableNode = node.get("pageable");
            if (pageableNode != null) {
                if (pageableNode.isArray() && pageableNode.size() == 2 && pageableNode.get(0).isTextual()) {
                    pageableNode = pageableNode.get(1);
                }
                if (pageableNode.has("pageNumber")) {
                    pageNumber = pageableNode.get("pageNumber").asInt();
                } else if (pageableNode.has("number")) {
                    pageNumber = pageableNode.get("number").asInt();
                }
                if (pageableNode.has("pageSize")) {
                    pageSize = pageableNode.get("pageSize").asInt();
                } else if (pageableNode.has("size")) {
                    pageSize = pageableNode.get("size").asInt();
                }
            } else {
                if (node.has("number")) {
                    pageNumber = node.get("number").asInt();
                }
                if (node.has("size")) {
                    pageSize = node.get("size").asInt();
                }
            }
            
            if (pageSize <= 0) {
                pageSize = 10;
            }
            
            return new PageImpl<>(content, PageRequest.of(pageNumber, pageSize), totalElements);
        }
    }
}
