import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class TemplateService {
  getHtmlTemplate(fileName: string, replacements: Record<string, string>): string {
    const isDev = process.env.NODE_ENV !== 'production';
    const filePath = isDev
      ? join(process.cwd(), 'src', 'views', fileName)
      : join(process.cwd(), 'dist', 'views', fileName);
      
    let html = readFileSync(filePath, 'utf8');

    for (const key in replacements) {
      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      html = html.replace(pattern, replacements[key]);
    }

    return html;
  }
}
