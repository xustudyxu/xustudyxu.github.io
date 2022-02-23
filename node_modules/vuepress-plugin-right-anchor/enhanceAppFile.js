import RightAnchor from './RightAnchor.vue'

export default ({ Vue }) => {
  Vue.component('RightAnchor', RightAnchor)

  Vue.component('GlobalRightAnchor', {
    name: 'GlobalRightAnchor',

    functional: true,

    render() {
      return <RightAnchor global={true}/>
    }
  })
}
