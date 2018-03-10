# 基于ethereum的原创保护方法
作者：SteveWooo
日期：2018/3/10
### 前言
以太坊学习笔记。利用以太坊保护hash所属与授权，降低专利维护成本。

### 环境准备
* nodejs 8.0^
* npm 5.4^
* truffle : http://truffleframework.com/
* geth : https://geth.ethereum.org/downloads/
* 推荐使用macox

### 安装与部署
##### 1:下载与初始化
`
git clone https://github.com/SteveWooo/original_protected
`
</br>
`
npm install
`
</br>
`
bash geth_init.sh 
`
</br>
`
bash geth_startup.sh
`
</br>
(进入geth控制台)
</br>
`
personal.newAccount("YOUR_PASSWORD") //创建一个账号
`
</br>
`
miner.setEtherbase("YOUR_ACCOUNT") //设置矿工账号
`
</br>
`
miner.start() //开始挖矿
`
##### 2:修改配置文件
修改config.json
</br>
```javascript
{
	"eth" : {
		"defaultAccount" : "YOUR_ACCOUNT",
		"defaultPassword" : "YOUR_PASSWORD",
		"contractAddress" : "CONTRACT_DEPLOY_ADDRESS"
	},
	"rpc" : {
		"host" : "localhost",
		"port" : "8545"
	},
	"web" : {
		"port" : "8090"
	}
}
```
##### 3、编译部署合约
(打开新的控制台窗口)
</br>
`
truffle compile
`
</br>
`
truffle migrate --reset
`
</br>
`
把部署地址修改到配置文件中的CONTRACT_DEPLOY_ADDRESS
`
##### 4、运行
`
npm run dev
`
### 测试
##### 新增item
GET : http://localhost:8090/add_item?item={item_hash}&platforms={platforms_array[]}
##### 获取item所属人
GET : http://localhost:8090/get_owner?item={item_hash}
##### 校验item是否授权
GET : http://localhost:8090/check_auth?item={item_hash}&platform={platform}
