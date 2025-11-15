package com.codetogive.codetogitteam3.config.seeder;

import com.codetogive.codetogitteam3.repository.SubscriptionRepository;
import com.codetogive.codetogitteam3.util.SubscriptionFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
@RequiredArgsConstructor
@Order(4)
public class SubscriptionSeeder implements CommandLineRunner {
    private final SubscriptionRepository subscriptionRepo;

    @Override
    public void run(String... args) throws Exception {
        if (subscriptionRepo.count() == 0) subscriptionRepo.saveAll(SubscriptionFactory.build());
    }
}
