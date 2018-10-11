// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodID = 0;
let mealID = 0;
let customerID = 0;
let deliveryID = 0;

class Neighborhood{
  constructor(name){
    this.name = name
    this.id = ++neighborhoodID;
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
  }
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id)
  }
  meals(){
    let fmeals = []
    let numeals = this.deliveries().map(delivery => delivery.meal())
    numeals.forEach(meal => {
      if (fmeals.indexOf(meal) === -1){
        fmeals.push(meal)
      }
    })
    return fmeals
  }
}

class Customer{
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerID
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }
  meals(){
    return this.deliveries().map(delivery => store.meals.find(meal => meal.id === delivery.mealId))
  }
  totalSpent(){
    return this.meals().reduce((acc,curr) => acc + curr.price, 0)
  }
}

class Meal{
  constructor(title,price){
    this.title = title
    this.price = price
    this.id = ++mealID
    store.meals.push(this)
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers(){
    return this.deliveries().map(delivery => store.customers.find(customer => customer.id === delivery.customerId))
  }
  static byPrice(){
    return store.meals.sort((meala,mealb) => (mealb.price - meala.price))
  }
}

class Delivery{
  constructor(mealId,neighborhoodId,customerId){
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryID
    store.deliveries.push(this)
  }
  meal(){
    return store.meals.find(meal => meal.id === this.mealId)
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }
  customer(){
    return store.customers.find(customer => customer.id === this.customerId)
  }
}
