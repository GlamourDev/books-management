
package hl.books.management;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("hl.books.management")
@EnableJpaRepositories("hl.books.management")
@SpringBootApplication(scanBasePackages = "hl.books.management")
public class BooksMain {

	public static void main(String[] args) {
		SpringApplication.run(BooksMain.class, args);
	}

}