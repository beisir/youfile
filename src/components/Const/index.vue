<script type="text/javascript">
const uploadImgUrl = 'http://123.56.164.213:7001'
let imageUrl = ''
if (process.env.NODE_ENV === 'production') {
  imageUrl = 'https://image.youlife.me/'
} else if (process.env.NODE_ENV === 'development') {
  imageUrl = 'https://dev-image.youlife.me/'
}
export default {
  imageUrl,
  uploadImgUrl
}
</script>
