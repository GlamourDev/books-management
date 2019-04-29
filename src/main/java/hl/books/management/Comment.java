package hl.books.management;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "comments")
public class Comment {
	@Id
	private Long id;
	private String comment;
	private String timestamp;

	public Comment() {
		super();
	}

	public Comment(long id, String comment, String timestamp) {
		super();
		this.id = id;
		this.comment = comment;
		this.timestamp = timestamp;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getComments() {
		return comment;
	}

	public void setComments(String comment) {
		this.comment = comment;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return String.format("Comment [id=%s, comment=%s, timestamp=%s]", id, comment, timestamp);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((comment == null) ? 0 : comment.hashCode());
		result = prime * result + ((timestamp == null) ? 0 : timestamp.hashCode());
		return result;
	}

}