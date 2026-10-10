package com.gradely.cohorts;

import com.gradely.users.Role;
import com.gradely.users.User;
import org.springframework.stereotype.Component;

@Component("cohortAccess")
public class CohortAccess {
    private final CohortRepository cohorts;
    public CohortAccess(CohortRepository cohorts) { this.cohorts = cohorts; }
    public boolean canRead(long id, User.Profile user) {
        if (user == null) return false;
        return cohorts.find(id).map(cohort -> user.role() == Role.ADMIN
                || (user.role() == Role.INSTRUCTOR && cohort.instructorId() == user.id())
                || (user.role() == Role.STUDENT && cohorts.hasStudent(id, user.id()))).orElse(false);
    }
}
