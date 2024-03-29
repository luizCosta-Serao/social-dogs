import React from 'react'
import FeedPhotosItem from './FeedPhotosItem'
import useFetch from '../Hooks/useFetch'
import { PHOTOS_GET } from '../../api';
import Error from '../../Helper/Error'
import Loading from '../../Helper/Loading';
import styles from './FeedPhotos.module.css'
import { useLocation } from 'react-router-dom';

const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {

  const { data, loading, error, request } = useFetch();
  const { pathname } = useLocation()
  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 3
      const { url, options } = PHOTOS_GET({page, total, user})
      const { response, json } = await request(url, options)
      if(response && response.ok && json.length < total) {
        setInfinite(false)
      }
    }
    fetchPhotos();
  }, [request, user, page, setInfinite])

  if(error) return <Error error={error} />
  if(loading) return <Loading />
  if(data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.length === 0 && pathname === '/conta' ? (
          <h2 className={styles.noPhoto}>
            Nenhuma foto publicada.
          </h2>
        ): '' }
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    )
  else return null
}

export default FeedPhotos