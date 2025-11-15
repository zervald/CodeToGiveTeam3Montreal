package com.codetogive.codetogitteam3.util;

import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.domain.User;

import java.math.BigDecimal;
import java.util.List;

public class SubscriptionFactory {

    public static List<Subscription> build() {
        User firstUser = UserFactory.build().getFirst();

        return List.of(Subscription.builder()
                .user(firstUser)
                .amount(BigDecimal.valueOf(10))
                .tier(Subscription.Tier.CHAMPION)
                .status(Subscription.Status.ACTIVE)
                .build()
        );
    }
}
