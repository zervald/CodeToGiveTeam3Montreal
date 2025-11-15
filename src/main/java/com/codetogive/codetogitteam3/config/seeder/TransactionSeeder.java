package com.codetogive.codetogitteam3.config.seeder;

import com.codetogive.codetogitteam3.repository.TransactionRepository;
import com.codetogive.codetogitteam3.util.TransactionFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

@Configuration
@RequiredArgsConstructor
@Order(5)
public class TransactionSeeder implements CommandLineRunner {
    private final TransactionRepository transactionRepo;

    @Override
    public void run(String... args) throws Exception {
        if (transactionRepo.count() == 0) transactionRepo.saveAll(TransactionFactory.build());
    }
}
