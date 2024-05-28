package com.ssafy.zipjoong.recommand.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.util.domain.EntityDate;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "combination")
@ToString
public class Combination extends EntityDate {
    @Id
    @Column(name="combination_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long combinationId;

    // 조합 가격
    @Setter
    @Column(name="combination_price")
    private Integer combinationPrice;

    // 조합 목록
    @OneToMany(mappedBy = "combination")
    @JsonManagedReference
    private List<CombinationProduct> combinationProducts;

    // 조합 생성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void addCombinationProduct(CombinationProduct combinationProduct){
        if(combinationProducts == null)combinationProducts = new ArrayList<>();
        this.combinationProducts.add(combinationProduct);
    }
}
