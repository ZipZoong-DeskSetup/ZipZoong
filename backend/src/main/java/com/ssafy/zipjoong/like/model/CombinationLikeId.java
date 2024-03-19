package com.ssafy.zipjoong.like.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CombinationLikeId implements Serializable {
    private String userId;
    private Long combinationId;
}