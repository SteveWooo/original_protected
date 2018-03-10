pragma solidity ^0.4.4;

contract Main{

	struct Item{
		uint publish_time;
		address owner;
		mapping(address=>uint) auth;
	}

	struct Platform{
		string name;
		uint register_time;
	}

	mapping(string=>Item) items;
	mapping(address=>Platform) platforms;

	function addItem(string _item_md5, address[] _platforms) public{
		if(items[_item_md5].publish_time != 0){
			return;
		}
		Item storage item = items[_item_md5];
		item.owner = msg.sender;
		item.publish_time = now;
		for(uint i=0;i<_platforms.length;i++){
			item.auth[_platforms[i]] = 1;
		}
	}

	function setAsPlatform(string name) public {
		Platform memory temp;
		temp.name = name;
		temp.register_time = now;
		platforms[msg.sender] = temp;
	}

	function getItemOwner(string md5) public view returns(address){
		return items[md5].owner;
	}

	function authPlatform(string _item_md5, address _platform_add) public view returns (uint){
		return items[_item_md5].auth[_platform_add];
	}
}