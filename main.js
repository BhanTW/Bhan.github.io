document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.bhan-container');

  // Function to create a twinkling star
  function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.animationDuration = `${Math.random() * 0.7 + 0.3}s`; // Even faster twinkle
    star.style.animationDelay = `${Math.random() * 0.7}s`; // Adjusted delay
    container.appendChild(star);

    // Remove star after animation completes (optional, for performance)
    star.addEventListener('animationiteration', () => {
      star.remove();
       // Create a new star to replace the old one
      createStar();
    });
  }

  // Create multiple stars
  const numberOfStars = 50; // Adjust for more or fewer stars
  for (let i = 0; i < numberOfStars; i++) {
    createStar();
  }

  // Initial display of blog posts
  displayBlogPosts();

  // Make returnToMain available globally
  window.returnToMain = function() {
      document.getElementById('blogCreation').style.display = 'none';
      document.getElementById('blogAccess').style.display = 'block';
      document.getElementById('passwordInput').value = '';
      document.getElementById('message').textContent = '';
  }
});

function checkPassword() {
  const password = document.getElementById('passwordInput').value;
  const message = document.getElementById('message');
  const blogAccess = document.getElementById('blogAccess');
  const blogCreation = document.getElementById('blogCreation');

  if (password === 'BhanHohan7') {
    message.textContent = 'Password Correct!';
    blogAccess.style.display = 'none';
    blogCreation.style.display = 'block';
  } else {
    message.textContent = 'Incorrect Password. Please try again.';
  }
}

let blogPosts = []; // Array to store blog posts

function createBlogPost() {
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;

    // Create blog post object
    const blogPost = {
        title: title,
        content: content,
        comments: [] // Initialize an empty array for comments
    };

    // Add the new blog post to the array
    blogPosts.push(blogPost);

    // Update the displayed blog posts
    displayBlogPosts();

    // Clear the input fields after submitting
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogContent').value = '';

    // Return to main page after creating post
    returnToMain();
}

function displayBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    blogPostsContainer.innerHTML = ''; // Clear existing posts

    blogPosts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('blog-post');
        postDiv.dataset.index = index; // Store the index for later use

        const titleElement = document.createElement('h3');
        titleElement.textContent = post.title;

        const contentElement = document.createElement('p');
        // Truncate content to a certain number of characters
        const maxLength = 100;
        if (post.content.length > maxLength) {
            contentElement.textContent = post.content.substring(0, maxLength) + '...';
            postDiv.classList.add('truncated'); // Add class for truncated posts
        } else {
            contentElement.textContent = post.content;
        }
        
        postDiv.addEventListener('click', function() {
            showFullBlogPost(this.dataset.index); // Call function to display full post
        });

        postDiv.appendChild(titleElement);
        postDiv.appendChild(contentElement);
        blogPostsContainer.appendChild(postDiv);
    });
}

function showFullBlogPost(index) {
  const post = blogPosts[index];
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.dataset.index = index;

  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;'; // "X" symbol
  closeButton.onclick = () => modal.remove();

  const titleElement = document.createElement('h2');
  titleElement.textContent = post.title;

  const contentElement = document.createElement('p');
  contentElement.textContent = post.content;

  // Comments Section
  const commentsSection = document.createElement('div');
  commentsSection.classList.add('comments-section');

  // Display existing comments
  const commentsList = document.createElement('ul');
  commentsList.classList.add('comments-list');
  post.comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.textContent = comment;
      commentsList.appendChild(commentItem);
  });
  commentsSection.appendChild(commentsList);

  // Add comment input
  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment';
  commentInput.classList.add('comment-input');

    // Add comment button
  const commentButton = document.createElement('button');
  commentButton.textContent = 'Post Comment';
  commentButton.onclick = () => {
      const commentText = commentInput.value.trim();
      if (commentText !== '') {
          post.comments.push(commentText);
          commentInput.value = '';
          modal.remove();
          displayBlogPosts();
          showFullBlogPost(index); // Re-open the modal to show the new comment
      }
  };
  commentsSection.appendChild(commentInput);
  commentsSection.appendChild(commentButton);

  modalContent.appendChild(closeButton);
  modalContent.appendChild(titleElement);
  modalContent.appendChild(contentElement);
  modalContent.appendChild(commentsSection);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}