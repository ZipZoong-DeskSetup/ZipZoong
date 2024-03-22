package com.ssafy.zipjoong.recommand.repository;

import com.ssafy.zipjoong.recommand.CombinationProduct;
import com.ssafy.zipjoong.recommand.CombinationProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CombinationProductRepository extends JpaRepository<CombinationProduct, CombinationProductId> {
}
