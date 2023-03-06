import { useSeoMeta } from '#imports'

/**
 *
 * @param { object } route
 * @param { object } place
 */
export default (route: object, place: object) => {
  let title = [
    'Отзывы',
    'о месте',
    place.full_name,
  ]

  if (route.params.stars) {
    title.splice(1, 0, `с оценкой ${route.params.stars},`)
  }

  title = title.join(' ')

  let description = `Читай свежие отзывы о «${place.full_name}» на сайте о путешествиях и туризме Тревио.ру`

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
  })

  return {
    title
  }
}