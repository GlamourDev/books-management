package hl.books.management;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class BookResource {

	@Autowired
	private BookRepository bookRepository;

	@GetMapping("/books")
	public List<Book> retrieveAllBooks() {
		return bookRepository.findAll();
	}

	@GetMapping("/books/{id}")
	public Book retrieveBook(@PathVariable long id) {
		Optional<Book> book = bookRepository.findById(id);

		if (!book.isPresent())
			throw new BookNotFoundException("id-" + id);

		return book.get();
	}

	@DeleteMapping("/books/{id}")
	public void deleteBook(@PathVariable long id) {
		bookRepository.deleteById(id);
	}

	@PostMapping("/books")
	public ResponseEntity<Object> createBook(@RequestBody Book book) {


		Book savedBook = bookRepository.save(book);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedBook.getId()).toUri();

		return ResponseEntity.created(location).build();

	}
	
	@PutMapping("/books/{id}")
	public ResponseEntity<Object> updateBook(@RequestBody Book book, @PathVariable long id) {

		Optional<Book> bookOptional = bookRepository.findById(id);

		if (!bookOptional.isPresent())
			return ResponseEntity.notFound().build();

		book.setId(id);
		
		bookRepository.save(book);

		return ResponseEntity.noContent().build();
	}
}
