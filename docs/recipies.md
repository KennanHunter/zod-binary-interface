# Various Recipes for working with Zod Binary Interface

## Working with Array Buffers

### Download to file

```typescript
const zbi = ZodBinaryInterface.fromSchema(z.string());

const buffer = zbi.encode("Example string");

const blob = new Blob([buffer]);

const downloadBlob = (fileBlob: Blob) => {
  const element = document.createElement("a");

  element.href = URL.createObjectURL(fileBlob);

  element.download = `data.bin`;

  document.body.appendChild(element); // Required for this to work on FireFox

  element.click();

  element.remove();
};

downloadBlob(blob);
```
