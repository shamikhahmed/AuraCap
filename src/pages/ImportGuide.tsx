import { ImportGuideContent } from '@/components/import/ImportGuideContent';

export function ImportGuide() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="page-title">How to Import Your Apps</h1>
        <p className="page-sub">Step-by-step guides for iPhone, iPad, Mac, and alternative methods</p>
      </div>
      <ImportGuideContent />
    </div>
  );
}
