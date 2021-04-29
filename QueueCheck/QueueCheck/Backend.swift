//
//  Backend.swift
//  QueueCheck
//
//  Created by Junyan Mao on 4/29/21.
//

import UIKit
import Amplify

class Backend {
    static let shared = Backend()
    static func initialize() -> Backend {
        return .shared
    }
    private init() {
        do {
            try Amplify.configure()
            print("Initialized Amplify successfully")
        } catch {
            print("Could not initialize Amplify: \(error)")
        }
    }
}
