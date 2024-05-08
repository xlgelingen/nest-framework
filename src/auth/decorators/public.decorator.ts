import { SetMetadata } from '@nestjs/common';

//这个常量IS_PUBLIC_KEY的作用是作为一个标识符，用于表示某个特定的元数据键（metadata key）。
//也会导出到auth.guard里面
export const IS_PUBLIC_KEY = 'isPublic';

//定义装饰器@Public
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
