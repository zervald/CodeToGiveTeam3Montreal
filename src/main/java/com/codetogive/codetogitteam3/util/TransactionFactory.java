package com.codetogive.codetogitteam3.util;


import com.codetogive.codetogitteam3.domain.DonationEvent;
import com.codetogive.codetogitteam3.domain.Subscription;
import com.codetogive.codetogitteam3.domain.Transaction;
import com.codetogive.codetogitteam3.domain.User;

import java.math.BigDecimal;
import java.util.List;

public class TransactionFactory {
    public static List<Transaction> build() {
        User firstUser = UserFactory.build().getFirst();
        Subscription firstSubscription = SubscriptionFactory.build().getFirst();
        DonationEvent firstEvent = DonationEventFactory.build().getFirst();

        return List.of(
                Transaction.builder()
                        .user(firstUser)
                        .amount(BigDecimal.valueOf(10))
                        .subscription(firstSubscription)
                        .anonymous(false)
                        .build(),
                Transaction.builder()
                        .user(firstUser)
                        .amount(BigDecimal.valueOf(25))
                        .subscription(firstSubscription)
                        .anonymous(false)
                        .event(firstEvent)
                        .build(),
                Transaction.builder()
                        .user(firstUser)
                        .amount(BigDecimal.valueOf(50))
                        .anonymous(false)
                        .build()
        );
    }
}
