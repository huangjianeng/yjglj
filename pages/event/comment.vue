<template>
	<view class="comment_wrap">
		<view class="content">
			<CommentItem @send="send" v-for="(v,i) in list" :key="i" :item="v" level="1"></CommentItem>
		</view>
	</view>
</template>

<script>
	import CommentItem from './commentItem.vue'
	import {
		addMsg
	} from "@/api.js"
	export default {
		components: {
			CommentItem
		},
		props: {
			id: {
				typeof: Number | String,
			},
			list: {
				type: Array,
			}
		},
		data() {
			return {
				title: 'Hello',
				data: [],
				commentText: '',
			}
		},
		mounted() {
			this.init()
			console.log(this.data)
		},
		methods: {
			send(val) {
				console.log('222',val)
				this.$emit('send',val)
			},
			init() {
				let arr = []
				for (let i = 1; i < 3; i++) {
					let obj = {
						name: '张' + i,
						text: '第' + i + '条评论',
						time: '2022-05-12 10:12',
						childs: [],
					}
					// for (let index = 1; index < 3; index++) {
					// 	obj.childs.push({
					// 		name: '子' + i,
					// 		text: '第' + i + '条评论的子评论',
					// 		time:'2022-05-12 10:12',
					// 		childs: [],
					// 	})
					// }
					arr.push(obj)
				}
				this.data = arr
			}
		}
	}
</script>

<style>
	.head {
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-weight: 600;
		color: #1D2732;
	}

	page {
		height: 100%;
	}

	.content {
		padding: 10px;
		background-color: white;
		border-radius: 10px;
	}
</style>
