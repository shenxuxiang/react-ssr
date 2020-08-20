export default function (assets) {
  const linkTags = [];
  const scriptTags = [];
  const linkMap = ['main.css'];
  const scriptMap = ['common.js', 'runtime~main.js', 'main.js'];
  scriptMap.forEach(key => {
    assets[key] && scriptTags.push(`<script src="${assets[key]}" type="text/javascript"></script>`);
  });

  linkMap.forEach(key => {
    assets[key] && linkTags.push(`<link href="${assets[key]}" rel="stylesheet" type="text/css"></link>`);
  });
  return {linkTags, scriptTags};
}
