export default function saveJSON ( obj, filename = 'jsonTest') {
    const blob = new Blob([JSON.stringify(obj, NaN, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      a.click();
      URL.revokeObjectURL(url);
}