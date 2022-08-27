import { useEffect, useState } from 'react'
import axios from 'axios'
import { getConsulters, getMedia } from '../api/endpoints'
import './consulters.scss'

export const sendRequest = () => {
  return axios.get(getConsulters()).then((response) => {
    return response.data
  })
}

export const getImageRequest = () => {
  return axios.get(getMedia()).then((response) => {
    return response.data
  })
}

const Consulters = () => {
  const [listConsulters, setListConsulters] = useState<any>([])
  const [imageConsulter, setImageConsulter] = useState<any>([])

  useEffect(() => {
    sendRequest().then((data) => {
      setListConsulters(data)
    })
  }, [])

  useEffect(() => {
    getImageRequest().then((img) => {
      setImageConsulter(img)
    })
  }, [])

  console.log('List: ', listConsulters)

  return (
    <div>
      <h1>Consulters</h1>
      {listConsulters.map((item: any) => {
        return (
          <div key={item.id}>
            <hr />
            <p>{item.acf.professional_position}</p>
            <div className="profile">
              <img src={item.featured_media_src_url} alt="profile" />
              <h3>
                {item.title.rendered} <small>({item.type})</small>
              </h3>
            </div>

            {imageConsulter.map((img: any) => {
              if (img.id === item.featured_media) {
                return (
                  <div key={img.id} className="profile">
                    <img src={img.guid.rendered} alt={img.slug} />
                    <h3>
                      {item.title.rendered} <small>({item.type})</small>
                    </h3>
                  </div>
                )
              }
            })}

            <p>{item.acf.text_editor}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Consulters

/**
 * delete the html tags from de text
 * <p dangerouslySetInnerHTML={{ __html: item.acf.text_editor }}/>
 *
 */
