import { use, useEffect, useState } from 'react'

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [error, setError] = useState(null);

  const [formError, setFormError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) {
      setFormError(true);
      return;
    }

    const simulatedPost = { ...newPost, id: Date.now() };
    setPosts([simulatedPost, ...posts]);
    setNewPost({ title: '', body: '' });
    setFormError(false);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} style={{ padding: 0, backgroundColor: '#ffeb3b' }}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='container my-3'>

            <h1 className='text-center'>Add New Post</h1>

            <div className='card my-3 shadow p-3 mb-5 bg-body'>

              <form onSubmit={handleSubmit}>

                <div className='mb-3'>
                  <label htmlFor='title' className='form-label'>
                    Title
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='body' className='form-label'>
                    Body
                  </label>
                  <textarea
                    className='form-control'
                    id='body'
                    rows='3'
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                  />
                </div>

                {formError && <p className="text-danger">Per favore, compila tutti i campi.</p>}

                <button type='submit' className='btn btn-primary'>
                  Add Post
                </button>

              </form>

            </div>
          </div>

          <div className='container'>

            <h2 className='text-center'>Posts</h2>

            <input
              type="text"
              className="form-control mb-4"
              placeholder="Cerca un post..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className='card my-3 shadow p-3 mb-5 bg-body'>
              {filteredPosts.length === 0 ? (
                <p className='text-center'>Nessun post trovato.</p>
              ) : (filteredPosts.map(post => (
                <section key={post.id} className='my-3 p-3 border-bottom'>

                  <h3 className='fw-bold'>
                    {highlightText(post.title, searchTerm)}
                  </h3>
                  <p>
                    {highlightText(post.body, searchTerm)}
                  </p>
                </section>
              )))}
            </div>

            <div className="d-flex justify-content-center gap-2 my-4">
              <button
                className="btn btn-outline-primary"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>
                Prev
              </button>

              <span className="align-self-center">Pagina {currentPage} di {totalPages}</span>

              <button
                className="btn btn-outline-primary"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}>
                Next
              </button>
            </div>

          </div>
        </>
      )}
    </>
  )
}

export default App
