<script type="text/javascript">
let imageUrl = ''
let privateImageUrl = ''
if (process.env.NODE_ENV === 'production') {
  imageUrl = 'https://image.youlife.me/'
  privateImageUrl = 'https://image.youlife.me/private/'
} else if (process.env.NODE_ENV === 'development') {
  imageUrl = 'https://dev-image.youlife.me/'
  privateImageUrl = 'https://dev-image.youlife.me/private/'
}
export default {
  imageUrl,
  privateImageUrl
}
</script>
