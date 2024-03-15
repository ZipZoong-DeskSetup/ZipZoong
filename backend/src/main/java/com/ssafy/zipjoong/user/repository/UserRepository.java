package com.ssafy.zipjoong.user.repository;

import com.ssafy.zipjoong.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

}
