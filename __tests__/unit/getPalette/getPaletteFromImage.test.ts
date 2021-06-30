import EventEmitter from 'wolfy87-eventemitter';
import { getPaletteFromImage } from '@src/index';

describe('import palette by image', () => {
  beforeAll(() => {
    class MockImage {
      source = '';

      ee = new EventEmitter();

      constructor() {
        this.ee.defineEvents(['load', 'error']);
      }

      set src(value: string) {
        this.source = value;
        if (value === 'success.png') {
          this.ee.emitEvent('load');
        } else {
          this.ee.emitEvent('error');
        }
      }

      addEventListener(event, callback) {
        this.ee.addListener(event, callback);
      }

      get src() {
        return this.source;
      }
    }
    //  @ts-ignore
    global.Image = MockImage;
  });

  it('should handle onerror event', async () => {
    const palette = await getPaletteFromImage('error.png', 8);
    expect(palette).toBeUndefined();
  });
});
