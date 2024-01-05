import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import Error from '../../Helper/Error';
import Loading from '../../Helper/Loading';
import PhotoContent from './PhotoContent';
import { PHOTO_PAGE_GET } from '../../api';
import Head from '../../Helper/Head';

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch()
  
  React.useEffect(() => {
    const { url } = PHOTO_PAGE_GET(id)
    request(url)
  }, [id, request])

  if(error) return <Error error={error} />
  if(loading) return <Loading />
  if(data)
    return (
      <section className='container mainConatiner'>
        <Head
          title={data.photo.title}
        />
        <PhotoContent single={true} data={data} />
      </section>
    )
  else return null
}

export default Photo