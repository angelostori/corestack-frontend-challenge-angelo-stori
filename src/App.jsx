import { use, useEffect, useState } from 'react'

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='container'>

          <ul>
            {posts.map(post => (
              <div key={post.id} className='card my-3 shadow p-3 mb-5 bg-body'>
                <li className='list-group-item my-3'>
                  <span className='fw-bold'>Title: </span>{post.title}
                  <br />
                  <span className='fw-bold'>Body: </span>{post.body}
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default App
