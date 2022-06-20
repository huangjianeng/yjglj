<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style lang="scss">
  // @import './@/pages/home/copy/index.css';
  /deep/.uni-page-body{
  	height: 100%;
  }
  .uni-page-body, uni-page-refresh{
	  height: 100%;
  }
</style>
