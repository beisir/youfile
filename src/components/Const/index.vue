<script type="text/javascript">
let imageUrl = ''
if (process.env.NODE_ENV === 'production') {
  imageUrl = 'https://image.youlife.me/'
} else if (process.env.NODE_ENV === 'development') {
  imageUrl = 'https://dev-image.youlife.me/'
}
export default {
  imageUrl
}
</script>
