package hl.books.management;

public class BookNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public BookNotFoundException(String exception) {
		super(exception);
	}
	

}
