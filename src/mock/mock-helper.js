export function getMockOrders() {
  return Array.from(Array(10)).map((_, index) => (
    {
      id: `${index}-id`,
      variantId: 'var_1fd',
      price: (index + 1) * 1310,
      startDate: new Date(new Date() - Math.random()*(1e+12)),
      endDate: new Date(new Date() - Math.random()*(1e+12)),
    }
  ))
}

export function getMockLoginResponse() {
  return {
    user: getMockUser(),
    status: 200,
    accessToken: "asdf1234",
  }
}

export function getMockUser() {
  return {
    id: "123456asdf",
    userName: "mockedJohnDoe",
    companyName: "John Doe Adventures, Inc.",
    email: "mock@email.com",
    name: "Mock Mockignton",
    city: "Hradec Kralove",
    street: "Vavřinecká 468",
    zipCode: "555 66",
    phone: "+420 456 123 789",
    image: "https://picsum.photos/400/250",
    role: ["USER", "ADMIN", "SELLER"],
  }
}

export function getMockEvent() {
  return {
    id: '1234abcdf1234abcfd',
    organizerId: '4567abcdf4567',
    contact: {
      name: 'John Doe Adventures, Inc.',
      phoneNumber: "+420 446 886 222"
    },
    name: 'Mocked event',
    descriptionShort: 'Short description appers here. Another amazing sentence. Awesome job everybody, keep it up.',
    descriptionLong: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu viverra nulla. In ultrices ullamcorper tristique. Quisque erat arcu, mattis eget massa pharetra, bibendum tristique augue. Fusce non leo in leo ultrices varius. Integer odio massa, sodales vel consectetur sit amet, finibus vitae nunc. Praesent nec orci eu erat mattis varius ut vel mauris. Integer ut dolor consectetur, finibus massa ut, vestibulum arcu. Aliquam molestie dignissim condimentum. Suspendisse ac odio at massa hendrerit interdum. Sed et ligula tempus, dignissim sem placerat, elementum elit. Vivamus molestie faucibus justo eget sollicitudin. Proin augue nisl, rutrum nec efficitur quis, viverra et sapien. Etiam sollicitudin est a felis egestas, et rutrum sem tempus. Nunc et augue purus. Cras convallis tellus sed fringilla lacinia. Suspendisse vitae neque ante.\n' +
      '\n' +
      'Proin turpis nisl, consectetur sed magna sit amet, tempus eleifend nisl. Maecenas viverra ligula lectus, in egestas tellus eleifend et. Praesent ut lectus tristique, mattis est sit amet, ornare ligula. Nam vehicula, metus et dapibus mattis, turpis lacus egestas dui, semper molestie justo lorem eu sapien. Quisque commodo ligula vel libero lobortis, sed vulputate diam eleifend. Donec lacinia a diam scelerisque ultrices. Sed condimentum purus vel neque eleifend, at mattis arcu consequat. Integer at lectus in velit semper venenatis eu at sem. Aenean ut finibus odio. Suspendisse suscipit, arcu eu commodo volutpat, felis orci sollicitudin risus, et pharetra risus nunc eu urna.\n' +
      '\n' +
      'Fusce non condimentum arcu. Nullam cursus hendrerit vehicula. Aliquam congue fermentum risus eget finibus. Fusce vulputate, ligula gravida posuere auctor, justo arcu ultricies turpis, eu tempus turpis urna vel dui. Quisque suscipit enim id mi viverra, eget congue ipsum pretium. Vestibulum sodales lobortis mauris, sed mollis elit aliquam et. Duis pretium sit amet ipsum sit amet consectetur. Donec congue tortor sed mattis laoreet. Quisque eget venenatis dolor, id accumsan risus.',
    address: 'Hradec Králové',
    image: 'https://picsum.photos/400/250',
    offeredPackages: [
      {
        id: '1fd',
        price: 1111,
        startDate: '2023-05-18T00:00:00Z',
        endDate: '2023-05-19T00:00:00Z',
      },
      {
        id: '2fd',
        price: 2222,
        startDate: '2023-08-20T00:00:00Z',
        endDate: '2023-05-22T00:00:00Z',
      },
      {
        id: '3fd',
        price: 3333,
        startDate: '2025-05-13T00:00:00Z',
        endDate: '2025-05-15T00:00:00Z',
      },
      {
        id: '4fd',
        price: 4444,
        startDate: '2023-10-13T00:00:00Z',
        endDate: '2023-10-15T00:00:00Z',
      }
    ]
  }
}