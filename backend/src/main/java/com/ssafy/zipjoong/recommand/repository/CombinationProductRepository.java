package com.ssafy.zipjoong.recommand.repository;

import com.ssafy.zipjoong.recommand.domain.CombinationProduct;
import com.ssafy.zipjoong.recommand.domain.CombinationProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CombinationProductRepository extends JpaRepository<CombinationProduct, CombinationProductId> {
}
