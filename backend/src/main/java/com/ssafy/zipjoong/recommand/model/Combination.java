package com.ssafy.zipjoong.recommand.model;

import com.ssafy.zipjoong.user.model.User;
import com.ssafy.zipjoong.util.model.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "combination")
public class Combination extends EntityDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long combinationId;

    // 조합 가격
    private Integer combinationPrice;

    // 조합 목록
    @OneToMany(mappedBy = "combination")
    private List<CombinationProduct> combinationProducts;

    // 조합 생성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
