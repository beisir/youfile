<script type="text/javascript">
let imageUrl = ''
let privateImageUrl = ''
const owner = 10000
if (process.env.NODE_ENV === 'production') {
  imageUrl = 'https://image.youlife.net.cn/'
  privateImageUrl = 'https://image-safe.youlife.net.cn/'
} else if (process.env.NODE_ENV === 'beta') {
  imageUrl = 'https://beta-image.youlife.net.cn/'
  privateImageUrl = 'https://beta-image-safe.youlife.net.cn/'
} else {
  imageUrl = 'https://dev-image.youlife.net.cn/'
  privateImageUrl = 'https://dev-image-safe.youlife.net.cn/'
}
export default {
  imageUrl,
  privateImageUrl,
  owner
}
</script>
