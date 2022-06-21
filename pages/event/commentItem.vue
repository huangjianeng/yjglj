<template>
	<view class="comment_item">
		<template v-if="level == 1">
			<view class="head">
				<view>{{item.name}}</view>
				<view class="time">{{item.time}}</view>
			</view>
			<view class="text">
				{{item.text}}
			</view>
			<view class="reply">
				<view @click="replyComment">
					<image src="@/static/hf@2x.png"></image>回复
				</view>
			</view>
		</template>
		<view class="child_head" v-if="level == 1">
			<view class="nums"> {{item.childs.length}}条讨论 </view>
			<view class="isOpen" @click="isOpen = !isOpen">
				<template v-if="isOpen">
					收起评论<image src="@/static/shouqi@2x.png"></image>
				</template>
				<template v-if="!isOpen">
					展开评论<image src="@/static/open@2x.png"></image>
				</template>
			</view>
		</view>
		<view class="comment_item_2" v-else-if="level == 2">
			<view>
				<view class="head">
					<view>{{item.name}}</view>
					<view class="time">{{item.time}}</view>
				</view>
				<view class="text">
					{{item.text}}
				</view>
				<view class="reply">
					<view @click="replyComment">
						<image src="@/static/hf@2x.png"></image>回复
					</view>
				</view>
			</view>
		</view>
		<comment-item v-if="item.childs && item.childs.length > 0 && isOpen" v-for="(v,i) in item.childs" :item="v"
			:itemIndex="i" :parent="item" level="2">
		</comment-item>
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="send_wrap">
				<!-- <uni-forms-item name="name">
					
				</uni-forms-item> -->
				<uni-easyinput :focus="true" type="textarea" :clearable="false" :inputBorder="false" v-model="commentText"
					placeholder="发表内容" />
				<view class="send_btn">发送</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'comment-item',
		props: {
			itemIndex: {
				type: Number
			},
			item: {
				type: Object
			},
			parent: {
				type: Object
			},
			level: {
				type: String
			}
		},
		data() {
			return {
				title: 'Hello',
				isOpen: true,
				commentText:'',
			}
		},
		onLoad() {

		},
		methods: {
			replyComment() {
				console.log('回复')
				this.toggle()
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(type) {
				// this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open('bottom')
			},
		}
	}
</script>

<style>
	.comment_item {}

	.head {
		display: flex;
		height: 30px;
		align-items: center;
		font-size: 13px;
		font-weight: 400;
		color: #9EAEC1;
	}

	.time {
		margin-left: 10px;
	}

	.text {
		font-size: 15px;
		font-weight: 400;
		color: #4E5E72;
		line-height: 15px;
	}

	.reply image {
		width: 18px;
		height: 18px;
		margin-right: 4px;
	}

	.reply {
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: right;
		/* text-align: right; */
	}

	.reply view {
		display: flex;
		align-items: center;
	}

	.child_head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 30px;

	}

	.child_head .nums {
		font-size: 18px;
		font-weight: 500;
		color: #1D2732;
	}

	.isOpen {
		display: flex;
		align-items: center;
	}

	.child_head image {
		width: 16px;
		height: 16px;
		margin-left: 4px;
	}

	.comment_item_2 {
		background: #F5F8FB;
		border-radius: 4px;
		font-size: 13px;
		font-weight: 400;
		color: #9EAEC1;
		line-height: 13px;
		padding: 10px;
	}
	.send_wrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
	}
	/deep/.uni-textarea-wrapper{
		background: #EFF3F7;
		border-radius: 4px;
		
		/* width: 80%; */
	}
	/deep/.uni-easyinput__placeholder-class{
		padding: 10px;
		box-sizing: border-box;
	}
	/deep/.uni-textarea-textarea{
		padding: 10px;
		box-sizing: border-box;
	}
	.send_btn{
		width: 80px;
		flex-shrink: 0;
		font-size: 18px;
		font-weight: 400;
		text-align: center;	
		color: #9EAEC1;

	}
</style>
