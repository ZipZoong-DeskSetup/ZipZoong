package com.ssafy.zipjoong.like.domain;

import jakarta.persistence.Column;
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
    @Column(name="user_id")
    private String userId;
    
    @Column(name="combination_id")
    private Long combinationId;
}