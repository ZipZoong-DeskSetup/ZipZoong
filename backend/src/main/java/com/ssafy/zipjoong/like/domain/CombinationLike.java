package com.ssafy.zipjoong.like.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.zipjoong.recommand.domain.Combination;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.util.domain.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("combinationId")
    @JsonBackReference
    @JoinColumn(name = "combination_id")
    private Combination combination;

    @Column(name="combination_like_is_deleted")
    private Boolean combinationLikeIsDeleted;

}