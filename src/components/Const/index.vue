<script type="text/javascript">
let imageUrl = ''
let privateImageUrl = ''
const owner = 10000
if (process.env.NODE_ENV === 'production') {
  imageUrl = 'https://image.youlife.me/'
  privateImageUrl = 'https://image-safe.youlife.me/'
} else {
  imageUrl = 'https://dev-image.youlife.me/'
  privateImageUrl = 'https://dev-image-safe.youlife.me/'
}
export default {
  imageUrl,
  privateImageUrl,
  owner
}
</script>
