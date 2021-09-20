export interface OrderModel {
  items: [
    {
      id: 'string';
      amount: 0;
    },
  ];
  details: {
    name: 'string';
    address: 'string';
    phone: 'string';
    timeToDeliver: 'string';
    comment: 'string';
  };
}
