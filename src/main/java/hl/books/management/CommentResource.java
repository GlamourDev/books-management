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
public class CommentResource {

	@Autowired
	private CommentRepository commentRepository;

	@GetMapping("/comments")
	public List<Comment> retrieveAllBooks() {
		return commentRepository.findAll();
	}

	@GetMapping("/comments/{id}")
	public Comment retrieveBook(@PathVariable long id) {
		Optional<Comment> comment = commentRepository.findById(id);

		if (!comment.isPresent())
			throw new BookNotFoundException("id-" + id);

		return comment.get();
	}

	@DeleteMapping("/comments/{id}")
	public void deleteBook(@PathVariable long id) {
		commentRepository.deleteById(id);
	}

	@PostMapping("/comments")
	public ResponseEntity<Object> createComment(@RequestBody Comment comment) {


		Comment savedComments = commentRepository.save(comment);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(savedComments.getId()).toUri();

		return ResponseEntity.created(location).build();

	}

	@PutMapping("/comments/{id}")
	public ResponseEntity<Object> updateComment(@RequestBody Comment comment, @PathVariable long id) {

		Optional<Comment> commentOptional = commentRepository.findById(id);

		if (!commentOptional.isPresent())
			return ResponseEntity.notFound().build();

		comment.setId(id);
		
		commentRepository.save(comment);

		return ResponseEntity.noContent().build();
	}
}
