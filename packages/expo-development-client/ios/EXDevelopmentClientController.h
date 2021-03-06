#import <React/RCTBridgeModule.h>
#import <React/RCTBridgeDelegate.h>


@class EXDevelopmentClientController;


@protocol EXDevelopmentClientControllerDelegate <NSObject>

- (void)developmentClientController:(EXDevelopmentClientController *)developmentClientController
                didStartWithSuccess:(BOOL)success;

@end


@interface EXDevelopmentClientController : NSObject <RCTBridgeDelegate>

@property (nonatomic, weak) RCTBridge *appBridge;

+ (instancetype)sharedInstance;

- (void)startWithWindow:(UIWindow *)window delegate:(id<EXDevelopmentClientControllerDelegate>)delegate launchOptions:(NSDictionary *)launchOptions;

- (NSURL *)sourceUrl;

- (void)navigateToLauncher;

@end
