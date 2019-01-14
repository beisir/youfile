<script type="text/javascript">
let imageUrl = ''
let privateImageUrl = ''
if (process.env.NODE_ENV === 'production') {
  imageUrl = 'https://image.youlife.me/'
  privateImageUrl = 'https://youlife-private-prod.oss-cn-beijing.aliyuncs.com/'
} else if (process.env.NODE_ENV === 'development') {
  imageUrl = 'https://dev-image.youlife.me/'
  privateImageUrl = 'https://youlife-private-dev.oss-cn-beijing.aliyuncs.com/'
}
export default {
  imageUrl,
  privateImageUrl
}
</script>
