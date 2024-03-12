package com.ssafy.zipjoong.like.model;

import com.ssafy.zipjoong.recommand.model.Combination;
import com.ssafy.zipjoong.user.model.User;
import com.ssafy.zipjoong.util.model.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "combination_like")
public class CombinationLike extends EntityDate {

    @EmbeddedId
    private CombinationLikeId combinationLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("combinationId")
    @JoinColumn(name = "combination_id")
    private Combination combination;

    private Boolean combinationLikeIsDeleted;

}