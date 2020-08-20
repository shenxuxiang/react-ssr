export default async function(routerList) {
  const len = routerList.length;
  const map = [];
  for (let i = 0; i < len; i++) {
    routerList[i].component.import();
  }
  const comps = await Promise.all(routerList.map(router => router.component.import()));
  return comps.map((comp, index) => {
    return {
      ...routerList[index],
      component: comp.default,
    };
  });
}
