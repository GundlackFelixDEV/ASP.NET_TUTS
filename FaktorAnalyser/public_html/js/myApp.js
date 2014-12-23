/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var factors = [
    new Factor({Description:"Fak1",Weight:0.1}),
    new Factor({Description:"Fak2",Weight:0.5})];  

var items = [
    new Item({
        Description:"FirstItem",
        Factors:factors
    }),
    new Item({
        Description:"SecondItem",
        Factors:factors
    })];
var rootItem = new RootItem({
    Description:"MyRootItem",
    Factors: factors,
    Children:items});

//Test to remove items from RootItem.Children Array
var remItem = items[1];
console.log("Index of Item: " + rootItem.Children.indexOf(remItem));
rootItem.removeChild(remItem);
console.log("Index of removed Item:" + rootItem.Children.indexOf(remItem));
rootItem.addChild(remItem);
console.log("Index of added Item: " + rootItem.Children.indexOf(remItem));
rootItem.removeChilds(items);
console.log("Number of Children: " + rootItem.Children.length);
